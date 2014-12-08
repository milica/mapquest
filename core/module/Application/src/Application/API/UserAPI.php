<?php
namespace Application\API;

use Zend\Mvc\Controller\AbstractRestfulController;
use Application\API\APITrait;

class UserAPI extends AbstractRestfulController{

    use APITrait;

    public function getList(){
        $result = $this->userModel()->getAll();
        return $this->standardResponse($result);

    }

    public function get($id){
        $result = $this->userModel()->get($id);
        return $this->standardResponse($result);
    }

    public function create($data){
        $result = $this->userModel()->create($data);
        return $this->standardResponse($result);
    }

    public function update($id, $data){
        $result = $this->userModel()->update($id, $data);
        return $this->standardResponse($result);
    }

    public function delete($id = null){
        $result = $this->userModel()->delete($id);
        return $this->standardResponse($result);
    }

}
