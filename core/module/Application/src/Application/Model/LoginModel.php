<?php
namespace Application\Model;
use Application\Document\User;

class LoginModel extends ApplicationModel{

    protected $authservice;

    protected $storage;

    function __construct($dm, $auth)
    {
        $this->dm = $dm;
        $this->auth = $auth;
    }

    public function LogIn($data)
    {
        $result = $this->standardResult();
        $result->success = false;

        $messages = null;

        if(empty($data['username'])){ return $this->logErrors('Missing Username'); }else{$username = $data['username'];}
        if(empty($data['password'])){ return $this->logErrors('Missing Password'); }else{$password = $data['password'];}


        $existing_user = $this->dm->getRepository('Application\Document\User')->findOneBy(array('username' => $username));
        if(empty($existing_user)){
            $User = new User();
            $User->setPassword($password);
            $User->setUsername($username);

            if(empty($messages)){
                $this->dm->persist($User);
                $this->dm->flush();
            }
        }


        $this->auth->getAdapter()->setIdentityValue($username);
        $module  = new \Application\Module;
        $config  = new \Zend\Config\Config($module->getConfig());
        $this->auth->getAdapter()->setCredentialValue(crypt($password,$config->auth->secreet));
        $auth_result = $this->auth->authenticate();

        foreach($auth_result->getMessages() as $message)
        {
            $messages[] = $message;
        }

        if ($auth_result->isValid()) {
            $messages = 'success';
            $result->success = true;
            $this->auth->setStorage($this->getSessionStorage());
            $this->auth->getStorage()->write(array('username' => $username));
        }

        $result->message = $messages;

        return $result;
    }
}