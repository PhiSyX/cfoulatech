<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Utilisateur;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

/**
 * @implements ProcessorInterface<Utilisateur, Utilisateur|void>
 */
final readonly class UtilisateurState implements ProcessorInterface
{
    public function __construct(
        #[Autowire('@api_platform.doctrine.orm.state.persist_processor')]
        private ProcessorInterface          $processor,
        private UserPasswordHasherInterface $passwordHasher,
    )
    {
    }

    /**
     * @param Utilisateur $data
     */
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): Utilisateur
    {
        $role = $data->getRole();
        $plainPassword = $data->getPlainPassword();

        if ($role) {
            switch (strtoupper($role)) {
                case "ROLE_ADMIN":
                {
                    $data->setRole(null);
                } break;
                default:
                {
                    $newRoles = array_unique(array_merge(
                        // Rôles courants
                        $data->getRoles(),
                        // Nouveau rôle
                        [$role],
                    ));
                    $data->setRoles($newRoles);
                    $data->setRole(null);
                } break;
            }
        }

        if ($plainPassword) {
            $hashedPassword = $this->passwordHasher->hashPassword(
                $data,
                $plainPassword,
            );
            $data->setPassword($hashedPassword);
            $data->setPlainPassword(null);
        }

        return $this->processor->process($data, $operation, $uriVariables, $context);
    }
}
