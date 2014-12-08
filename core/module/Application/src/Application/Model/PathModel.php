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
        $result = $this->standardResult();

        $AreaMdl = new AreaModel($this->dm);

        $area = $AreaMdl->getAreaObject($data['area']);

        $Path = new Path();
        $Path->setArea($area);
        $Path->setParticipant($this->getUser());
        $Path->setStatus(false);

        $this->dm->persist($Path);
        $this->dm->flush();

        $result->message = $Path->getId();

        return $result;
    }




    public function update($id, $data)
    {
        $result = $this->standardResult();

        $path_o = $this->getPathObject($id);
        $path_o->setStatus(true);
        $this->dm->persist($path_o);
        $this->dm->flush();

        $result->message = 'Success';

        return $result;
    }

    public function delete($id)
    {

    }

    public function deletePathByUserAndQuest($quest_id)
    {
        $user = $this->getUser();

        $QuestMdl = new QuestModel($this->dm);
        $AreaMdl = new AreaModel($this->dm);

        $quest = $QuestMdl->getQuestObject($quest_id);
        $areas = $AreaMdl->getAreasByMap($quest->getMap());

        foreach($areas as $area)
        {
            $Path = $this->repository->findOneBy(array('participant.id' => $user->getId(), 'area.id' => $area->getId()));
            if(!empty($Path))
            {
                $this->dm->remove($Path);
                $this->dm->flush();

            }

        }


    }

    public function getPathsByQuest($quest_id)
    {
        $user = $this->getUser();

        $QuestMdl = new QuestModel($this->dm);
        $AreaMdl = new AreaModel($this->dm);

        $quest = $QuestMdl->getQuestObject($quest_id);
        $areas = $AreaMdl->getAreasByMap($quest->getMap());

        $statuses = array();


        foreach($areas as $area)
        {
            $status = $this->repository->findOneBy(array('participant.id' => $user->getId(), 'area.id' => $area->getId()));
            $statuses[$area->getId()] = $status->getStatus();
        }


        return $statuses;
    }


}