<?php

namespace Application\API;

use Zend\View\Model\JsonModel;
/** models **/

use Application\Model\AreaModel;
use Application\Model\LoginModel;
use Application\Model\MapModel;
use Application\Model\ParticipantModel;
use Application\Model\PathModel;
use Application\Model\QuestModel;

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
            return new JsonModel(array('message' => $result->message));
        }
    }

    /*** MODELS ***/

    private function areaModel() { return new AreaModel($this->getEntityManager()); }
    private function loginModel() { return new LoginModel($this->getEntityManager(), $this->getAuthAdapter()); }
    private function mapModel() { return new MapModel($this->getEntityManager()); }
    private function participantModel() { return new ParticipantModel($this->getEntityManager()); }
    private function pathModel() { return new PathModel($this->getEntityManager()); }
    private function questModel() { return new QuestModel($this->getEntityManager()); }

    /***#MODEL#***/
}