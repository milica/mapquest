<?php
namespace Application\Model;
use Application\Document\Area;

class AreaModel extends ApplicationModel{


    function __construct($dm)
    {
        $this->dm = $dm;
        $this->repository = $this->dm->getRepository('Application\Document\Area');
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