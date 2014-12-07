<?php
namespace Application\Model;
use Application\Document\Path;

class PathModel extends ApplicationModel{


    function __construct($dm)
    {
        $this->dm = $dm;
        $this->repository = $this->dm->getRepository('Application\Document\Path');
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