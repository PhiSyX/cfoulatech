<?php

namespace App\Serializer;

use App\Entity\User;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Vich\UploaderBundle\Storage\StorageInterface;

class UserFileUploadNormalizer implements NormalizerInterface
{
	private const string ALREADY_CALLED = 'USER_FILE_UPLOAD_NORMALIZER_ALREADY_CALLED';

	public function __construct(
		#[Autowire(service: 'api_platform.jsonld.normalizer.item')]
		private readonly NormalizerInterface $normalizer,
		private readonly StorageInterface    $storage,
	)
	{
	}

	public function normalize(mixed $object, ?string $format = null, array $context = []): array|string|int|float|bool|\ArrayObject|null
	{
		/** @var User $object */
		$context[self::ALREADY_CALLED] = true;
		$object->setImageName($this->storage->resolveUri($object, 'imageFile'));
		return $this->normalizer->normalize($object, $format, $context);
	}

	public function supportsNormalization($data, ?string $format = null, array $context = []): bool
	{

		if (isset($context[self::ALREADY_CALLED])) {
			return false;
		}
		return $data instanceof User;
	}

	public function getSupportedTypes(?string $format): array
	{
		return [
			User::class => true,
		];
	}
}
