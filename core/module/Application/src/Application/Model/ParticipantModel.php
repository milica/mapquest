<?php
namespace Application\Model;
use Application\Document\Participant;

class ParticipantModel extends ApplicationModel{


    function __construct($dm)
    {
        $this->dm = $dm;
        $this->repository = $this->dm->getRepository('Application\Document\Participant');
    }

    public function getParticipantObject($id)
    {
        $participant = $this->repository->find($id);
        return $participant;
    }

    public function get($id)
    {

    }

    public function getAll()
    {

    }

    public function create($data)
    {

    }

    public function update($id, $data)
    {

    }

    public function delete($id)
    {

    }

}