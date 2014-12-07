<?php
namespace Application\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

/** @ODM\Document */
class User {

    /** @ODM\Id */
    private $id;

    /** @ODM\Field(type="string") */
    private $firstname;

    /** @ODM\Field(type="string") */
    private $lastname;

    /** @ODM\Field(type="string") @ODM\UniqueIndex */
    private $email;

    /** @ODM\String @ODM\UniqueIndex */
    private $username;

    /** @ODM\Field(type="string") */
    private $password;

    /** @ODM\Field(type="string") */
    private $role = 'USER';




    protected $config;

    public function __construct() {
        $conf = new \Application\Module();

        $this->config = new \Zend\Config\Config($conf->getConfig());
    }

    public function getEmail() {
        return $this->email;
    }

    public function setUser($username,$password,$email,$firstname,$lastname) {
        $this->username  = $username;
        $this->setPassword($password);
        $this->email  = $email;
        $this->firstname = $firstname;
        $this->lastname  = $lastname;
    }

    public function getPassword(){
        return $this->password;
    }

    public function setUsername($val)
    {
        $val = trim($val);
        if(empty($val)){return false;}
        $this->username = $val;
        return true;
    }

    public function setEmail($val)
    {
        $val = trim($val);
        if(empty($val)){return false;}
        $this->email = $val;
        return true;
    }

    public function setPassword($val){
        $val = trim($val);
        if(empty($val)){return false;}
        $this->password  = crypt($val,$this->config->auth->secreet);
        return true;
    }

}