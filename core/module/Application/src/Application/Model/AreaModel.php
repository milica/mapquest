<?php
namespace Application\Model;
use Application\Document\Area;

class AreaModel extends ApplicationModel{


    function __construct($dm)
    {
        $this->dm = $dm;
        $this->repository = $this->dm->getRepository('Application\Document\Area');
    }

    public function getAreaObject($id)
    {
        $area = $this->repository->find($id);
        return $area;
    }

    public function get($id)
    {
        $result = $this->standardResult();
        $result->message = $this->formatArea($this->getAreaObject($id));
        return $result;
    }

    public function getAll()
    {
        $result = $this->standardResult();
        $areas = $this->repository->findAll();
        $result->message = $this->formatAreas($areas);
        return $result;
    }

    public function create($data)
    {
        $result = $this->standardResult();

        if(!empty($data['title'])){$title = $data['title'];}
        if(!empty($data['color'])){$color = $data['color'];}
        if(!empty($data['bounds'])){$bounds = $data['bounds'];}
        if(!empty($data['latitude'])){$latitude = $data['latitude'];}
        if(!empty($data['longitude'])){$longitude = $data['longitude'];}
        if(!empty($data['map'])){$map = $data['map'];}

        $mapMdl = new MapModel($this->dm);
        $map = $mapMdl->getMapObject($map);
        if(empty($map)){return $this->logErrors('Not existing Map');}

        $user = $this->getUser();

        $Area = new Area();

        if(!$Area->setTitle($title)){return $this->logErrors('Wrong value for parameter Title');}
        if(!$Area->setColor($color)){return $this->logErrors('Wrong value for parameter Color');}
        if(!$Area->setBounds($bounds)){return $this->logErrors('Wrong value for parameter Bounds');}
        if(!$Area->setLatitude($latitude)){return $this->logErrors('Wrong value for parameter Latitude');}
        if(!$Area->setLongitude($longitude)){return $this->logErrors('Wrong value for parameter Longitude');}
        if(!$Area->setMap($map)){return $this->logErrors('Wrong value for parameter Map');}
        if(!$Area->setUser($user)){return $this->logErrors('Wrong value for parameter User');}

        $this->dm->persist($Area);
        $this->dm->flush();

        $result->message = $Area->getId();

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
        $area = $this->repository->find($id);

        if(empty($area)){return $this->logErrors('Area Does not exist');}

        $this->dm->remove($area);
        $this->dm->flush();
        $result->message = 'Success';
        return $result;
    }

    public function getAreasByMap($map_o)
    {
        return $this->repository->findBy(array('map.id' => $map_o->getId()));
    }

    public function formatAreas($areas, $details = false)
    {
        $response = array();

        if(count($areas) > 0)
        {
            foreach($areas as $area_o)
            {
                $response[] = $this->formatArea($area_o, $details);
            }
        }

        return $response;
    }

    private function formatArea($area_o, $details = false)
    {
        $area = new \stdClass();

        $area->id           = $area_o->getId();
        $area->title        = $area_o->getTitle();
        $area->color        = $area_o->getColor();
        $area->bounds       = $area_o->getBounds();
        $area->latitude     = $area_o->getLatitude();
        $area->longitude    = $area_o->getLongitude();
        $area->map          = $area_o->getMap()->getId();
        $area->user         = $area_o->getUser()->getUsername();

        if($details){
            $area->user_id     = $area_o->getUser()->getId();
        }

        return $area;
    }

}