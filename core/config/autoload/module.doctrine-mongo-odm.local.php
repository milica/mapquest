<?php
return array(
    'doctrine' => array(
        'connection' => array(
            'odm_default' => array(
                'server'           => 'ds063150.mongolab.com',
                'port'             => '63150',
                'connectionString' => null,
                'user'             => '',
                'password'         => '',
                'dbname'           => 'mapquest',
                'options'          => array()
            ),
        ),

        'configuration' => array(
            'odm_default' => array(
                'metadata_cache'     => 'array',

                'driver'             => 'odm_default',

                'generate_proxies'   => true,
                'proxy_dir'          => 'data/DoctrineMongoODMModule/Proxy',
                'proxy_namespace'    => 'DoctrineMongoODMModule\Proxy',

                'generate_hydrators' => true,
                'hydrator_dir'       => 'data/DoctrineMongoODMModule/Hydrator',
                'hydrator_namespace' => 'DoctrineMongoODMModule\Hydrator',
//
               'default_db'         => 'mapquest'
//
//                'filters'            => array(),  // array('filterName' => 'BSON\Filter\Class'),
//
//                'logger'             => null // 'DoctrineMongoODMModule\Logging\DebugStack'
            )
        ),

        'driver' => array(
            'odm_default' => array(
//                'drivers' => array()
            )
        ),

        'documentmanager' => array(
            'odm_default' => array(
                'connection'    => 'odm_default',
               'configuration' => 'odm_default',
                'eventmanager' => 'odm_default'
            )
        ),

        'eventmanager' => array(
            'odm_default' => array(
                'subscribers' => array()
            )
        ),

        'authentication'    => array(
            'odm_default'   => array(
                'object_manager'        => 'doctrine.documentmanager.odm_default',
                'identity_class'        => 'Application\Document\User',
                'identity_property'     => 'username',
                'credential_property'   => 'password',
            ),
        ),

        'odm_driver' => array(
            'class' => 'Doctrine\ODM\MongoDB\Mapping\Driver\AnnotationDriver',
            'paths' => array(__DIR__ . '/../src/' . __NAMESPACE__ . '/Document')
        ),
        'odm_default' => array(
            'drivers' => array(
                __NAMESPACE__ . '\Document' => 'odm_driver'
            )
        ),

    ),

);