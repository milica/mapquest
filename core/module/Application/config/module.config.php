<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2013 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

return array(
    'doctrine' => array(
        'driver' => array(
            'application_documents' => array(
                'class' =>'Doctrine\ODM\MongoDB\Mapping\Driver\AnnotationDriver',
                'cache' => 'array',
                'paths' => array(__DIR__ . '/../src/Application/Document')
            ),

            'odm_default' => array(
                'drivers' => array(
                    'Application\Document' => 'application_documents'
                )
            ),

        ),
    ),
    'router' => array(
        'routes' => array(

            'area'=> array(
                'type' => 'segment',
                'options' => array(
                    'route'    => '/area[/:id]',
                    'defaults' => array('controller' => 'AreaAPI'),
                ),
            ),

            'user'=> array(
                'type' => 'segment',
                'options' => array(
                    'route'    => '/user[/:id]',
                    'defaults' => array('controller' => 'UserAPI'),
                ),
            ),

            'login'=> array(
                'type' => 'segment',
                'options' => array(
                    'route'    => '/login',
                    'defaults' => array('controller' => 'LoginAPI'),
                ),
            ),

            'path'=> array(
                'type' => 'segment',
                'options' => array(
                    'route'    => '/path[/:id]',
                    'defaults' => array('controller' => 'PathAPI'),
                ),
            ),

            'quests'=> array(
                'type' => 'segment',
                'options' => array(
                    'route'    => '/quests[/:id]',
                    'defaults' => array('controller' => 'QuestAPI'),
                ),
            ),

            'quests-by-map'=> array(
                'type' => 'segment',
                'options' => array(
                    'route'    => '/quests-by-map[/:id]',
                    'defaults' => array('controller' => 'QuestByMapAPI' ),
                ),
            ),


            'map'=> array(
                'type' => 'segment',
                'options' => array(
                    'route'    => '/map[/:id]',
                    'defaults' => array('controller' => 'MapAPI'),
                ),
            ),

            'participant'=> array(
                'type' => 'segment',
                'options' => array(
                    'route'    => '/participant[/:id]',
                    'defaults' => array('controller' => 'ParticipantAPI'),
                ),
            ),

            'join'=> array(
                'type' => 'segment',
                'options' => array(
                    'route'    => '/join[/:id]',
                    'defaults' => array('controller' => 'JoinAPI'),
                ),
            ),

            'quit'=> array(
                'type' => 'segment',
                'options' => array(
                    'route'    => '/quit[/:id]',
                    'defaults' => array('controller' => 'QuitAPI'),
                ),
            ),



            'home' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/',
                    'defaults' => array(
                        'controller' => 'Application\Controller\Index',
                        'action'     => 'index',
                    ),
                ),
            ),


            'application' => array(
                'type'    => 'Literal',
                'options' => array(
                    'route'    => '/application',
                    'defaults' => array(
                        '__NAMESPACE__' => 'Application\Controller',
                        'controller'    => 'Index',
                        'action'        => 'index',
                    ),
                ),

                'may_terminate' => true,
                'child_routes' => array(
                    'default' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => '/[:controller[/:action]]',
                            'constraints' => array(
                                'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'action'     => '[a-zA-Z][a-zA-Z0-9_-]*',
                            ),
                            'defaults' => array(
                            ),
                        ),
                    ),
                ),
            ),

        ),
    ),
    'service_manager' => array(
        'abstract_factories' => array(
            'Zend\Cache\Service\StorageCacheAbstractServiceFactory',
            'Zend\Log\LoggerAbstractServiceFactory',
        ),
        'aliases' => array(
            'translator' => 'MvcTranslator',
        ),
    ),
    'translator' => array(
        'locale' => 'en_US',
        'translation_file_patterns' => array(
            array(
                'type'     => 'gettext',
                'base_dir' => __DIR__ . '/../language',
                'pattern'  => '%s.mo',
            ),
        ),
    ),
    'controllers' => array(
        'invokables' => array(
            'Application\Controller\Index'  => 'Application\Controller\IndexController',
            'AreaAPI'                       => 'Application\API\AreaAPI',
            'LoginAPI'                      => 'Application\API\LoginAPI',
            'PathAPI'                       => 'Application\API\PathAPI',
            'QuestAPI'                      => 'Application\API\QuestAPI',
            'MapAPI'                        => 'Application\API\MapAPI',
            'ParticipantAPI'                => 'Application\API\ParticipantAPI',
            'QuestByMapAPI'                 => 'Application\API\QuestByMapAPI',
            'UserAPI'                       => 'Application\API\UserAPI',
            'JoinAPI'                       => 'Application\API\JoinAPI',
            'QuitAPI'                       => 'Application\API\QuitAPI',
        ),
    ),
    'view_manager' => array(
        'strategies' => array(
            'ViewJsonStrategy',
        ),
        'display_not_found_reason' => true,
        'display_exceptions'       => true,
        'doctype'                  => 'HTML5',
        'not_found_template'       => 'error/404',
        'exception_template'       => 'error/index',
        'template_map' => array(
            'layout/layout'           => __DIR__ . '/../view/layout/layout.phtml',
            'application/index/index' => __DIR__ . '/../view/application/index/index.phtml',
            'error/404'               => __DIR__ . '/../view/error/404.phtml',
            'error/index'             => __DIR__ . '/../view/error/index.phtml',
        ),
        'template_path_stack' => array(
            'application' => __DIR__ . '/../view',
        ),



    ),
    // Placeholder for console routes
    'console' => array(
        'router' => array(
            'routes' => array(
            ),
        ),
    ),
    'auth' => array(
        'timeout' => 1200,
        'secreet' => '$5$rounds=6592$xatraswejuwru2urufrecregusW3tref$', // SHA-256
    ),
);
