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
        $this->repository = $this->dm->getRepository('Application\Document\User');
    }

    public function LogIn($data)
    {
        $result = $this->standardResult();
        $result->success = false;

        $messages = null;

        if(empty($data['username'])){ return $this->logErrors('Missing Username'); }else{$username = $data['username'];}
        if(empty($data['password'])){ return $this->logErrors('Missing Password'); }else{$password = $data['password'];}

        $user_id = null;
        $existing_user = $this->repository->findOneBy(array('username' => $username));
        if(empty($existing_user)){
            $User = new User();
            $User->setPassword($password);
            $User->setUsername($username);

            if(empty($messages)){
                $this->dm->persist($User);
                $this->dm->flush();
            }

            $user_id = $User->getId();
        }else{
            $user_id = $existing_user->getId();
        }


        $this->auth->getAdapter()->setIdentityValue($username);
        $module  = new \Application\Module;
        $config  = new \Zend\Config\Config($module->getConfig());
        $this->auth->getAdapter()->setCredentialValue(crypt($password,$config->auth->secreet));
        $auth_result = $this->auth->authenticate();

        if ($auth_result->isValid()) {
            $result->message = $user_id;
            $result->success = true;
            $this->auth->setStorage($this->getSessionStorage());
            $this->auth->getStorage()->write(array('username' => $username));
        }else{
            return $this->logErrors('Bad Creditionals');
        }

        return $result;
    }


}