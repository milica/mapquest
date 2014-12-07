<?php
namespace Application\Shared;

use Zend\Session\Container as SessionContainer;

trait ApplicationTrait{

    protected $sesscontainer ;

    protected function getSessContainer()
    {
        if (!$this->sesscontainer) {$this->sesscontainer = new SessionContainer('mapquest'); }
        return $this->sesscontainer;
    }

    public function getSessionStorage()
    {
        if (! $this->storage) {
            $this->storage = new \Application\Shared\SessionStorage('mapquest');
        }
        return $this->storage;
    }

    public function getRole()
    {
        if(!$this->getSessContainer()->storage['role']){return 'anonymous'; }

        return $this->getSessContainer()->storage['role'];
    }






    public function standardResult()
    {
        $result = new \stdClass();
        $result->success = true;
        $result->message = null;
        return $result;
    }
}