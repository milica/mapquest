<?php

namespace Application\API;

use Zend\View\Model\JsonModel;
/** models **/
use Application\Model\LoginModel;
/**# models #**/


trait APITrait{

    protected $entityManager;

    protected function setEntityManager($em)
    {
        $this->entityManager = $em;
        return $this;
    }

    protected function getEntityManager()
    {
        if (null === $this->entityManager) {
            $this->setEntityManager($this->getOdmService());
        }
        return $this->entityManager;
    }

    protected function getOdmService()
    {
        return $this->getServiceLocator()->get('doctrine.documentmanager.odm_default');
    }

    protected function getAuthAdapter()
    {
        return $this->getServiceLocator()->get('doctrine.authenticationservice.odm_default');
    }

    protected function badRequest(){ $this->response->setStatusCode(400); }

    protected function methodNotAllowed(){ $this->response->setStatusCode(405); throw new \Exception('Method Not Allowed'); }

    private function standardResponse($result)
    {

        if($result->success){
            return new JsonModel(array("data" => $result->message));
        }else{
            $this->badRequest();
            return new JsonModel(array('error' => $result->message, 'message' => 'Error'));
        }
    }

    /*** MODELS ***/
    private function loginModel() { return new LoginModel($this->getEntityManager(), $this->getAuthAdapter()); }
    /***#MODEL#***/
}