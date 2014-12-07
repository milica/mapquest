<?php
namespace Application\Model;

use Application\Shared\ApplicationTrait;
use Application\Module;
use Zend\Mvc\Controller\AbstractActionController;

class ApplicationModel extends AbstractActionController{

    use ApplicationTrait;

    public      $cache = false;

    public      $dm;

    protected   $repository;

    protected   $config;

    protected $storage;

    protected function setConfig()
    {
        $module = new Module();
        $this->config =  $module->getConfig();
    }

    public function getConfig()
    {
        if($this->config == null){
            $this->setConfig();
        }
        return $this->config;
    }


    public function logErrors($error)
    {
        $result = new \stdClass();

        $result->success = false;
        $result->message = $error;


        return $result;
    }
}