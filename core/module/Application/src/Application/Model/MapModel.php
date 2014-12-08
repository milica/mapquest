<?php
namespace Application\Model;
use Application\Document\Map;

class MapModel extends ApplicationModel{


    function __construct($dm)
    {
        $this->dm = $dm;
        $this->repository = $this->dm->getRepository('Application\Document\Map');
    }

    public function getMapObject($id)
    {
        $map = $this->repository->find($id);
        return $map;
    }


    public function get($id)
    {
        $result = $this->standardResult();
        $result->message = $this->formatMap($this->getMapObject($id));
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
        $result = $this->standardResult();

        if(!empty($data['title'])){$title = $data['title'];}else{return $this->logErrors('Missing Title');}
        if(!empty($data['user'])){$user = $data['user'];}else{return $this->logErrors('Missing User');}

        $userMdl = new UserModel($this->dm);
        $user = $userMdl->getUserObject($user);

        if(empty($user)){return $this->logErrors('Not existing User');}

        $Map = new Map();
        if(!$Map->setTitle($title)){return $this->logErrors('Wrong value for parameter Title');}
        if(!$Map->setUser($user)){return $this->logErrors('Wrong value for parameter  User');}
        $this->dm->persist($Map);
        $this->dm->flush();

        $result->message = $Map->getId();
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