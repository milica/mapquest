<?php
namespace Application\Model;
use Application\Document\Path;

class PathModel extends ApplicationModel{


    function __construct($dm)
    {
        $this->dm = $dm;
        $this->repository = $this->dm->getRepository('Application\Document\Path');
    }

    public function getPathObject($id)
    {
        $path = $this->repository->find($id);
        return $path;
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