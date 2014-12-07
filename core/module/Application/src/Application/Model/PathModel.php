<?php
namespace Application\Model;
use Application\Document\Path;

class PathModel extends ApplicationModel{


    function __construct($dm)
    {
        $this->dm = $dm;
    }

}