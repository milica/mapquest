<?php
namespace Application\API;

use Zend\Mvc\Controller\AbstractRestfulController;
use Application\API\APITrait;

class AreaAPI extends AbstractRestfulController{

    use APITrait;

    public function getList(){
        $result = $this->areaModel()->getAll();
        return $this->standardResponse($result);
    }

    public function get($id){
        $result = $this->areaModel()->get($id);
        return $this->standardResponse($result);
    }

    public function create($data){
        $result = $this->areaModel()->create($data);
        return $this->standardResponse($result);
    }

    public function update($id, $data){
        $result = $this->areaModel()->update($id, $data);
        return $this->standardResponse($result);
    }

    public function delete($id = null){
        $result = $this->areaModel()->delete($id);
        return $this->standardResponse($result);
    }

}