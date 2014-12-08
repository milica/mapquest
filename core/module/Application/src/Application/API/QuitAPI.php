<?php
namespace Application\API;

use Zend\Mvc\Controller\AbstractRestfulController;
use Application\API\APITrait;

class QuitAPI extends AbstractRestfulController{

    use APITrait;

    public function getList(){$this->methodNotAllowed();}

    public function get($id){$this->methodNotAllowed();}

    public function create($data){$this->methodNotAllowed();}

    public function update($id, $data){
        $result = $this->participantModel()->delete($id);
        return $this->standardResponse($result);

    }

    public function delete($id = null){$this->methodNotAllowed();}

}
