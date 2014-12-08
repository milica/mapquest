<?php
namespace Application\API;

use Zend\Mvc\Controller\AbstractRestfulController;
use Application\API\APITrait;

class JoinAPI extends AbstractRestfulController{

    use APITrait;

    public function getList(){$this->methodNotAllowed();}

    public function get($id){$this->methodNotAllowed();}

    public function create($data){
        $result = $this->participantModel()->create($data);
        return $this->standardResponse($result);
    }

    public function update($id, $data){$this->methodNotAllowed();}

    public function delete($id = null){$this->methodNotAllowed();}

}