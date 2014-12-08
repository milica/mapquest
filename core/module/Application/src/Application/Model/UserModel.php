<?php

namespace Application\Model;

class UserModel extends ApplicationModel{

    function __construct($dm)
    {
        $this->dm = $dm;
        $this->repository = $this->dm->getRepository('Application\Document\User');
    }

    public function getUserObject($id)
    {
        $user = $this->repository->find($id);
        return $user;
    }

    public function get($id)
    {
        $result = $this->standardResult();
        $result->message = $this->formatUser($this->getUserObject($id));
        return $result;
    }

    public function getAll()
    {
        $result = $this->standardResult();

        return $result;
    }

    public function create($data)
    {
        $result = $this->standardResult();

        return $result;
    }

    public function update($id, $data)
    {
        $result = $this->standardResult();

        return $result;
    }

    public function delete($id)
    {
        $result = $this->standardResult();

        return $result;
    }

    private function formatUser($user_o, $details = false)
    {
        $user = new \stdClass();

        $participantsMdl = new ParticipantModel($this->dm);

        $user->id          = $user_o->getId();
        $user->username   = $user_o->getUsername();
        $user->quests     = $participantsMdl->getParticipantByUser($user->id);

        if($details){

        }

        return $user;
    }

}