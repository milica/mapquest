<?php
namespace Application\Model;
use Application\Document\Map;

class MapModel extends ApplicationModel{


    function __construct($dm)
    {
        $this->dm = $dm;
        $this->repository = $this->dm->getRepository('Application\Document\Map');
    }

    public function get($id)
    {
        $result = $this->standardResult();
        $map = $this->repository->find();
        $result->message = $this->formatMap($map);
        return $result;
    }

    public function getAll()
    {
        $result = $this->standardResult();
        $maps = $this->repository->findAll();
        $result->message = $this->formatMaps($maps);
        return $result;
    }

    public function create($data)
    {

    }

    public function update($data)
    {

    }

    public function delete($id)
    {
        $result = $this->standardResult();
        $map = $this->repository->find($id);

        if(empty($map)){return $this->logErrors('Map Does not exist');}

        $this->dm->remove($map);
        $this->dm->flush();
        $result->message = 'Success';

        return $result;
    }

    private function formatMaps($maps, $details = false)
    {
        $response = array();

        if(count($maps) > 0)
        {
            foreach($maps as $map_o)
            {
                $response[] = $this->formatMap($map_o, $details);
            }
        }

        return $response;
    }

    private function formatMap($map_o, $details = false)
    {
        $map = new \stdClass();

        $map->id        = $map_o->getId();
        $map->title     = $map_o->getTitle();
        $map->user      = $map_o->getUser()->getUsername();

        if($details){
            $map->user_id     = $map_o->getUser()->getId();
        }
        return $map;
    }

}