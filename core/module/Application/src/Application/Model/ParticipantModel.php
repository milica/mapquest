<?php
namespace Application\Model;
use Application\Document\Participant;

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

        $questMdl = new QuestModel($this->dm);
        $quest = $questMdl->getQuestObject($quest);
        if(empty($quest)){return $this->logErrors('Not existing Quest');}

        $user = $this->getUser();

        $Participant = new Participant();
        $Participant->setUser($user);
        $Participant->setQuest($quest);

        $this->dm->persist($Participant);
        $this->dm->flush();

        $result->message = $Participant->getId();

        return $result;
    }

    public function update($id, $data)
    {

    }

    public function delete($quest_id)
    {
        $result = $this->standardResult();

        $user = $this->getUser();

        $quest = $this->repository->findBy(array('quest.id' => $quest_id, 'user.id' => $user->getId()));

        if(empty($quest)){return $this->logErrors('Participant Does not exist');}

        $this->dm->remove($quest);
        $this->dm->flush();
        $result->message = 'Success';

        return $result;
    }



    public function getParticipantByUser($user_id)
    {
        $participants = $this->repository->findBy(array('user.id' => $user_id));

        $participant = array();

        if(!empty($participants)){
            foreach($participants as $participant_o){
                $participant[] = formatParticipant($participant_o);
            }
        }

        return $participant;

    }

    private function formatParticipant($participant_o, $details = false)
    {
        $participant = new \stdClass();

        $QuestMdl   = new QuestModel($this->dm);
        $AreaMdl    = new AreaModel($this->dm);

        $map_o  = $participant_o->getQuest()->getMap();
        $areas  = count($AreaMdl->getAreasByMap($map_o));

        $participant->quest_name    = $participant_o->getQuest()->getTitle();
        $participant->status        = $QuestMdl->getQuestStatus($participant_o->getQuest());
        $participant->score         = $participant_o->getScore().'/'.$areas;
        $participant->rank          = $participant_o->getRank();


        if($details){

        }

        return $participant;
    }

}