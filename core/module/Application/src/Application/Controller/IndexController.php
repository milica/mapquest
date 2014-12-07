<?php

namespace Application\Controller;


use Application\Document\User;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Application\Shared\ApplicationTrait;


class IndexController extends AbstractActionController
{

    use ApplicationTrait;

    protected $storage;

    protected $entityManager;

    protected function setEntityManager($em)
    {
        $this->entityManager = $em;
        return $this;
    }

    protected function getEntityManager()
    {
        if (null === $this->entityManager) {
            $this->setEntityManager($this->getServiceLocator()->get('doctrine.documentmanager.odm_default'));
        }
        return $this->entityManager;
    }

    protected function getAuthAdapter()
    {
        return $this->getServiceLocator()->get('doctrine.authenticationservice.odm_default');
    }



    public function indexAction()
    {

    }

    public function loginAction()
    {
        $result = $this->standardResult();
        $result->success = false;

        $request = $this->getRequest();

        if ($request->isPost()){

            $messages = null;

            $username      = $request->getPost('username');
            $password       = $request->getPost('password');

            if(empty($username)){ return $this->logErrors('Missing Username'); }
            if(empty($password)){ return $this->logErrors('Missing Password'); }

            $existing_user = $this->getEntityManager()->getRepository('Application\Document\User')->findOneBy(array('username' => $username));
            if(empty($existing_user)){
                $User = new User();
                $User->setPassword($password);
                $User->setUsername($username);

                if(empty($messages)){
                    $this->getEntityManager()->persist($User);
                    $this->getEntityManager()->flush();
                }
            }


            $this->getAuthAdapter()->getAdapter()->setIdentityValue($username);
            $module  = new \Application\Module;
            $config  = new \Zend\Config\Config($module->getConfig());
            $this->getAuthAdapter()->getAdapter()->setCredentialValue(crypt($password,$config->auth->secreet));
            $auth_result = $this->getAuthAdapter()->authenticate();

            foreach($auth_result->getMessages() as $message)
            {
                $messages[] = $message;
            }

            if ($auth_result->isValid()) {
                $messages = 'success';
                $result->success = true;
                $this->getAuthAdapter()->setStorage($this->getSessionStorage());
                $this->getAuthAdapter()->getStorage()->write(array('username' => $username));
            }

            $result->message = $messages;

            $view = new ViewModel();
            $view->setTemplate('application/index/message');
            $view->setTerminal(true);

            $json = json_encode(
                array(
                    'message' => $result->message,
                    'success' => $result->success
                )
            );
            echo $json;
            return $view;
        }

    }



}
