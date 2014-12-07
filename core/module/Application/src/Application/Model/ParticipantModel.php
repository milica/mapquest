<?php
namespace Application\Model;
use Application\Document\Participant;

class ParticipantModel extends ApplicationModel{


    function __construct($dm)
    {
        $this->dm = $dm;
    }

}