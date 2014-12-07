<?php
namespace Application\Model;
use Application\Document\Area;

class AreaModel extends ApplicationModel{


    function __construct($dm)
    {
        $this->dm = $dm;
    }

}