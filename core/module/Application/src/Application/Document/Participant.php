<?php
namespace Application\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

/** @ODM\Document */
class Participant {

    /** @ODM\Id */
    private $id;

    /** @ODM\ReferenceOne(targetDocument="Quest") */
    private $quest;

    /** @ODM\ReferenceOne(targetDocument="User") */
    private $user;

    /** @ODM\Field(type="int") */
    private $score = 0;

    /** @ODM\Field(type="int") */
    private $rank;


    // ******* SETTERS ******* //
    public function setQuest($val){
        if(!is_a($val, 'Application\Document\Quest')){ return false;}
        $this->quest = $val;
        return true;
    }

    public function setUser($val){
        if(!is_a($val, 'Application\Document\User')){ return false;}
        $this->user = $val;
        return true;
    }

    public function setScore($val) {
        if(!is_int($val)){return false;}
        $this->score = $val;
        return true;
    }

    public function setRank($val) {
        if(!is_int($val)){return false;}
        $this->rank = $val;
        return true;
    }
    // #****** SETTERS ******# //


    // ******* GETTERS ******* //
    public function getQuest(){
        return $this->quest;
    }

    public function getUser(){
        return $this->user;
    }

    public function getScore(){
        return $this->score;
    }

    public function getRank(){
        return $this->rank;
    }

    // #****** GETTERS ******# //

}