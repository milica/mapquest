<?php
namespace Application\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

/** @ODM\Document */
class Quest {

    /** @ODM\Id */
    private $id;

    /** @ODM\Field(type="string") */
    private $title;

    /** @ODM\Field(type="string") */
    private $desc;

    /** @ODM\Field(type="int") */
    private $start;

    /** @ODM\Field(type="int") */
    private $finish;

    /** @ODM\ReferenceOne(targetDocument="User") */
    private $user;

    /** @ODM\ReferenceOne(targetDocument="Map") */
    private $map;


    // ******* SETTERS ******* //
    public function setTitle($val) {
        if(empty($val)){return false;}
        $this->title = $val;
        return true;
    }

    public function setDesc($val) {
        if(empty($val)){return false;}
        $this->desc = $val;
        return true;
    }

    public function setStart($val) {
        if(!is_int($val)){return false;}
        $this->start = $val;
        return true;
    }

    public function setFinish($val) {
        if(!is_int($val)){return false;}
        $this->finish = $val;
        return true;
    }

    public function setUser($val){
        if(!is_a($val, 'Application\Document\User')){ return false;}
        $this->user = $val;
        return true;
    }

    public function setMap($val){
        if(!is_a($val, 'Application\Document\Map')){ return false;}
        $this->map = $val;
        return true;
    }

    // #****** SETTERS ******# //


    // ******* GETTERS ******* //

    // #****** GETTERS ******# //

}