<?php
namespace Application\Model;
use Application\Document\Map;

class MapModel extends ApplicationModel{


    function __construct($dm)
    {
        $this->dm = $dm;
    }

}