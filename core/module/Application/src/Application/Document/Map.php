<?php
namespace Application\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

/** @ODM\Document */
class Map {

    /** @ODM\Id */
    private $id;

    // ******* SETTERS ******* //

    // #****** SETTERS ******# //


    // ******* GETTERS ******* //
    public function getId()
    {
        return $this->id;
    }
    // #****** GETTERS ******# //

}