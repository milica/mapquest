<?php
namespace Application\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

/** @ODM\Document */
class Path {

    /** @ODM\Id */
    private $id;

    /** @ODM\ReferenceOne(targetDocument="User") */
    private $participant;

    /** @ODM\ReferenceOne(targetDocument="Area") */
    private $area;

    /** @ODM\Field(type="boolean") */
    private $status = false;



    public function setParticipant($val){
        if(!is_a($val, 'Application\Document\User')){ return false;}
        $this->participant = $val;
        return true;
    }


    public function setArea($val){
        if(!is_a($val, 'Application\Document\Area')){ return false;}
        $this->area = $val;
        return true;
    }

    public function setStatus($val){
        if(!is_bool($val)){ return false;}
        $this->status = $val;
        return true;
    }

}