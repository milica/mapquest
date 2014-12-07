<?php
namespace Application\API;

use Zend\Mvc\Controller\AbstractRestfulController;
use Application\API\APITrait;

class QuestAPI extends AbstractRestfulController{

    use APITrait;

    public function getList(){
        $result = $this->questModel()->getAll();
        return $this->standardResponse($result);
    }

    public function get($id){
        $result = $this->questModel()->get($id);
        return $this->standardResponse($result);
    }

    public function create($data){
        $result = $this->questModel()->create($data);
        return $this->standardResponse($result);
    }

    public function update($id, $data){
        $result = $this->questModel()->update($id, $data);
        return $this->standardResponse($result);
    }

    public function delete($id = null){
        $result = $this->questModel()->delete($id);
        return $this->standardResponse($result);
    }

}