<?php
namespace Application\Model;
use Application\Document\Quest;

class QuestModel extends ApplicationModel{


    function __construct($dm)
    {
        $this->dm = $dm;
    }

}