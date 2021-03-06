<?php
namespace Application\Model;
use Application\Document\Participant;
use Application\Document\Path;

class ParticipantModel extends ApplicationModel{


    function __construct($dm)
    {
        $this->dm = $dm;
        $this->repository = $this->dm->getRepository('Application\Document\Participant');
    }

    public function getParticipantObject($id)
    {
        $participant = $this->repository->findBy($id);
        return $participant;
    }


    public function get($id)
    {
        $result = $this->standardResult();
        $result->message = $this->formatParticipant($this->getParticipantObject($id));
        return $result;
    }

    public function getAll()
    {

    }

    public function create($data)
    {
        $result = $this->standardResult();

        if(!empty($data['quest'])){$quest = $data['quest'];}else{return $this->logErrors('Missing Quest ID');}
        $user = $this->getUser();

        $participant = $this->repository->findBy(array('quest.id' => $quest, 'user.id' => $user->getId()));

        if(!empty($participant)){return $this->logErrors('User already joined');}

        $questMdl = new QuestModel($this->dm);
        $quest = $questMdl->getQuestObject($quest);
        if(empty($quest)){return $this->logErrors('Not existing Quest');}

        $Participant = new Participant();
        $Participant->setUser($user);
        $Participant->setQuest($quest);

        $this->dm->persist($Participant);
        $this->dm->flush();

        $this->createPaths($quest);

        $result->message = $Participant->getId();

        return $result;
    }

    private function createPaths($quest_o)
    {
        $PathMdl = new PathModel($this->dm);
        $QuestMdl = new QuestModel($this->dm);
        $areas = $QuestMdl->getQuoteAreas($quest_o->getId());
        foreach($areas as $area)
        {
            $PathMdl->create(array('area' => $area->getId()));
        }
    }

    public function update($id, $data)
    {


    }

    public function delete($quest_id)
    {
        $result = $this->standardResult();

        $user = $this->getUser();

        $quest = $this->repository->findOneBy(array('quest.id' => $quest_id, 'user.id' => $user->getId()));

        if(empty($quest)){return $this->logErrors('Participant Does not exist');}

        $PathMdl = new PathModel($this->dm);
        $PathMdl->deletePathByUserAndQuest($quest_id);

        $this->dm->remove($quest);
        $this->dm->flush();



        $result->message = 'Success';

        return $result;
    }



    public function getParticipantByUser($user_id)
    {
        $participants = $this->repository->findBy(array('user.id' => $user_id));

        return $this->formatParticipants($participants);

    }

    public function getParticipantsByQuest($quest_id)
    {
        $participants = $this->repository->findBy(array('quest.id' => $quest_id));
        return $this->formatParticipants($participants);
    }



    public function getDetailedParticipantsByQuest($quest_id)
    {
        $result = $this->standardResult();
        $participants = $this->repository->findBy(array('quest.id' => $quest_id));
        $result->message = $this->formatParticipants($participants, true);

        return $result;
    }

    public function isParticipant($quest_id)
    {
        $PathMdl = new PathModel($this->dm);

        $user       = $this->getUser();
        $user_id    = $user->getId();

        $participant = $this->repository->findBy(array('quest.id' => $quest_id, 'user.id' => $user_id));

        if(!empty($participant)){
            return $PathMdl->getPathsByQuest($quest_id);
        }

        return false;
    }

    private function formatParticipants($participants, $details = false)
    {
        $response = array();

        if(count($participants) > 0)
        {
            foreach($participants as $participant_o)
            {
                $response[] = $this->formatParticipant($participant_o, $details);
            }
        }

        return $response;
    }

    private function formatParticipant($participant_o, $details = false)
    {
        $participant = new \stdClass();

        $QuestMdl   = new QuestModel($this->dm);
        $AreaMdl    = new AreaModel($this->dm);

        $map_o  = $participant_o->getQuest()->getMap();
        $areas  = count($AreaMdl->getAreasByMap($map_o));

        $participant->user          = $participant_o->getUser()->getUsername();
        $participant->user_id       = $participant_o->getUser()->getId();
        $participant->quest_id      = $participant_o->getQuest()->getId();
        $participant->quest_name    = $participant_o->getQuest()->getTitle();
        $participant->status        = $QuestMdl->getQuestStatus($participant_o->getQuest());
        $participant->score         = $participant_o->getScore().'/'.$areas;
        $participant->rank          = $participant_o->getRank();


        if($details){
            $participant->areas     = $this->isParticipant($participant_o->getQuest()->getId());
        }

        return $participant;
    }


    public function getParticipantData($user_id, $quest_id)
    {
        $participant = new \stdClass();

        $AreaMdl    = new AreaModel($this->dm);

        $participant_o = $this->repository->findOneBy(array('quest.id' => $quest_id, 'user.id' => $user_id));

        $map_o  = $participant_o->getQuest()->getMap();
        $areas  = count($AreaMdl->getAreasByMap($map_o));

        $participant->score         = $participant_o->getScore().'/'.$areas;
        $participant->rank          = $participant_o->getRank();

        return $participant;

    }

}