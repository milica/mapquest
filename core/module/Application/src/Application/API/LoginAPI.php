<?php
namespace Application\API;

use Zend\Mvc\Controller\AbstractRestfulController;
use Application\API\APITrait;

class LoginAPI extends AbstractRestfulController{

    use APITrait;

    public function getList(){$this->methodNotAllowed();}

    public function get($id){$this->methodNotAllowed(); }

    /** LOG IN */
    public function create($data){

        $result = $this->loginModel()->LogIn($data);
        return $this->standardResponse($result);
    }

    public function update($id, $data){ $this->methodNotAllowed(); }

    /** LOG OUT */
    public function delete($id = null){ $this->methodNotAllowed(); }

}