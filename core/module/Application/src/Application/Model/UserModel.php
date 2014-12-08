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

}