<?php
namespace Application\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

/** @ODM\Document */
class Map {

    /** @ODM\Id */
    private $id;

    /** @ODM\Field(type="string") */
    private $title;

    /** @ODM\ReferenceOne(targetDocument="User") */
    private $user;


    // ******* SETTERS ******* //

    public function setTitle($val) {
        if(empty($val)){return false;}
        $this->title = $val;
        return true;
    }

    public function setUser($val){
        if(!is_a($val, 'Application\Document\User')){ return false;}
        $this->user = $val;
        return true;
    }

    // #****** SETTERS ******# //


    // ******* GETTERS ******* //

    public function getId()
    {
        return $this->id;
    }

    public function getTitle(){
        return $this->title;
    }

    public function getUser(){
        return $this->user;
    }

    // #****** GETTERS ******# //

}