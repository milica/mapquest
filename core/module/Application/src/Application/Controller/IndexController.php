<?php

namespace Application\Controller;


use Application\Document\User;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;



class IndexController extends AbstractActionController
{
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

    public function indexAction()
    {
       // $this->install();
    }

    public function registrationAction()
    {
        $request = $this->getRequest();
        $message = null;
        $success = 0;

        if ($request->isPost()){

            $email      = $request->getPost('email');
            $password   = $request->getPost('password');
            $type       = $request->getPost('type');

            $existing_user = $this->getEntityManager()->getRepository('Application\Document\User')->findOneBy(array('email' => $email));
            if(!empty($existing_user)){
                $message = 'User already exist';
            }

            $User = new User();
            if(!$User->setPassword($password)){$message = 'Empty Password';}
            if(!$User->setUsername($email)){$message = 'Invalid Email';}
            if(!$User->setEmail($email)){$message = 'Invalid Email';}

            if(empty($message)){
                $this->getEntityManager()->persist($User);
                $this->getEntityManager()->flush();
            }


            $view = new ViewModel();
            $view->setTemplate('admin/admin/message');
            $view->setTerminal(true);

            $json = json_encode(
                array(
                    'message' => $message,
                    'success' => $success
                )
            );
            echo $json;
            return $view;
        }

    }



    private function install()
    {
        $user = new User();
        $user->setUser('master','master','master@master.com','Master','Master');
        $this->getEntityManager()->persist($user);
        $this->getEntityManager()->flush();
    }
}
