<?php
namespace Application\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

/** @ODM\Document */
class Area {

    /** @ODM\Id */
    private $id;

    /** @ODM\Field(type="string") */
    private $title;

    /** @ODM\Field(type="string") */
    private $color;

    /** @ODM\Raw */
    private $bounds;

    /** @ODM\Field(type="float") */
    private $latitude;

    /** @ODM\Field(type="float") */
    private $longitude;

    /** @ODM\ReferenceOne(targetDocument="Map") */
    private $map;

    /** @ODM\ReferenceOne(targetDocument="User") */
    private $user;

    // ******* SETTERS ******* //

    public function setTitle($val) {
        if(empty($val)){return false;}
        $this->title = $val;
        return true;
    }

    public function setColor($val) {
        if(empty($val)){return false;}
        $this->color = $val;
        return true;
    }

    public function setBounds($val)
    {
        if(empty($val)){return false;}
        $this->bounds = $val;
        return true;
    }

    public function setLatitude($val) {
        if(!is_numeric($val)){return false;}
        $this->latitude = $val;
        return true;
    }

    public function setLongitude($val) {
        if(!is_numeric($val)){return false;}
        $this->longitude = $val;
        return true;
    }

    public function setMap($val){
        if(!is_a($val, 'Application\Document\Map')){ return false;}
        $this->map = $val;
        return true;
    }

    public function setUser($val){
        if(!is_a($val, 'Application\Document\User')){ return false;}
        $this->user = $val;
        return true;
    }

    // #****** SETTERS ******# //


    // ******* GETTERS ******* //
    public function getId(){
        return $this->id;
    }

    public function getTitle(){
        return $this->title;
    }

    public function getColor(){
        return $this->color;
    }

    public function getBounds(){
        return $this->bounds;
    }

    public function getLatitude(){
        return $this->latitude;
    }

    public function getLongitude(){
        return $this->longitude;
    }

    public function getMap(){
        return $this->map;
    }

    public function getUser(){
        return $this->user;
    }

    // #****** GETTERS ******# //

}