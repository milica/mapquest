<?php
namespace Application\Model;
use Application\Document\Quest;

class QuestModel extends ApplicationModel{


    function __construct($dm)
    {
        $this->dm = $dm;
        $this->repository = $this->dm->getRepository('Application\Document\Quest');
    }

    public function getQuestObject($id)
    {
        $quest = $this->repository->find($id);
        return $quest;
    }


    public function get($id)
    {
        $result = $this->standardResult();
        $result->message = $this->formatQuest($this->getQuestObject($id));
        return $result;
    }

    public function getAll()
    {
        $result = $this->standardResult();
        $quests = $this->repository->findAll();
        $result->message = $this->formatQuests($quests);
        return $result;
    }

    public function getQuestsByMap($map_id)
    {
        $result = $this->standardResult();
        $quests = $this->repository->findBy(array('map.id' => $map_id));
        $result->message = $this->formatQuests($quests);
        return $result;
    }

    public function create($data)
    {
        $result = $this->standardResult();

        if(!empty($data['title'])){$title = $data['title'];}else{return $this->logErrors('Missing Title');}
        if(!empty($data['description'])){$description = $data['description'];}else{$description = null;}
        if(!empty($data['start'])){$start  = strtotime($data['start']);}else{return $this->logErrors('Missing Start Time');}
        if(!empty($data['finish'])){$finish = strtotime($data['finish']);}else{return $this->logErrors('Missing Finish Time');}
        if(!empty($data['map'])){$map = $data['map'];}else{return $this->logErrors('Missing Map');}

        $mapMdl = new MapModel($this->dm);
        $map = $mapMdl->getMapObject($map);
        if(empty($map)){return $this->logErrors('Not existing Map');}

        $user = $this->getUser();

        $Quest = new Quest();

        if(!$Quest->setTitle($title)){return $this->logErrors('Wrong value for parameter Title');}
        if(!$Quest->setDesc($description)){return $this->logErrors('Wrong value for parameter Description');}
        if(!$Quest->setStart($start)){return $this->logErrors('Wrong value for parameter StTime');}
        if(!$Quest->setFinish($finish)){return $this->logErrors('Wrong value for parameter  Finish Time');}
        if(!$Quest->setUser($user)){return $this->logErrors('Wrong value for parameter  User');}
        if(!$Quest->setMap($map)){return $this->logErrors('Wrong value for parameter Map');}

        $this->dm->persist($Quest);
        $this->dm->flush();

        $result->message = $Quest->getId();

        return $result;
    }

    public function update($id, $data) // TODO
    {
        $result = $this->standardResult();

        return $result;
    }

    public function delete($id)
    {
        $result = $this->standardResult();
        $quest = $this->repository->find($id);

        if(empty($quest)){return $this->logErrors('Quest Does not exist');}

        $this->dm->remove($quest);
        $this->dm->flush();
        $result->message = 'Success';

        return $result;
    }

    public function getQuestStatus($quest_o)
    {

        $start      = $quest_o->getStart();
        $finish     = $quest_o->getFinish();

        if(time() > $start){
            $status = 'pending';
        }elseif($start > time() && time() < $finish){
            $status = 'running';
        }elseif(time() > $finish){
            $status = 'finished';
        }

        return $status;
    }

    private function formatQuests($quests, $details = false)
    {
        $response = array();

        if(count($quests) > 0)
        {
            foreach($quests as $quest_o)
            {
                $response[] = $this->formatQuest($quest_o, $details);
            }
        }

        return $response;
    }

    private function formatQuest($quest_o, $details = false)
    {
        $quest = new \stdClass();

        $AreaMdl = new AreaModel($this->dm);
        $ParticipantMdl = new ParticipantModel($this->dm);

        $start      = $quest_o->getStart();
        $finish     = $quest_o->getFinish();

        $quest->id              = $quest_o->getId();
        $quest->title           = $quest_o->getTitle();
        $quest->start           = $start;
        $quest->finish          = $finish;
        $quest->status          = $this->getQuestStatus($quest_o);
        $quest->participants    = count($ParticipantMdl->getParticipantsByQuest($quest_o->getId()));
        $quest->participant     = $ParticipantMdl->isParticipant($quest_o->getId());
        $quest->area            = $AreaMdl->formatAreas($AreaMdl->getAreasByMap($quest_o->getMap()));

        if($details){
            // TODO whoich params exactly
            $quest->desc = $quest_o->getDesc();
            $quest->user = $quest_o->getUser();
            $quest->map = $quest_o->getMap();
        }

        return $quest;
    }

}