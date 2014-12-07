<?php
namespace Application\Model;
use Application\Document\Quest;

class QuestModel extends ApplicationModel{


    function __construct($dm)
    {
        $this->dm = $dm;
        $this->repository = $this->dm->getRepository('Application\Document\Quest');
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

    public function update($data)
    {

    }

    public function delete($id)
    {

    }

}