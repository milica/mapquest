<?php
namespace Application\API;

use Zend\Mvc\Controller\AbstractRestfulController;
use Application\API\APITrait;

class MapAPI extends AbstractRestfulController{

    use APITrait;

    public function getList(){
        $result = $this->mapModel()->getAll();
        return $this->standardResponse($result);

    }

    public function get($id){
        $result = $this->mapModel()->get($id);
        return $this->standardResponse($result);
    }

    public function create($data){
        $result = $this->mapModel()->create($data);
        return $this->standardResponse($result);
    }

    public function update($id, $data){
        $result = $this->mapModel()->update($id, $data);
        return $this->standardResponse($result);
    }

    public function delete($id = null){
        $result = $this->mapModel()->delete($id);
        return $this->standardResponse($result);
    }

}