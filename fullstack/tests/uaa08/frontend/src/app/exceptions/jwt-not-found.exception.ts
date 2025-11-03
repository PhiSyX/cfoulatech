export class JwtNotFoundException extends Error
{
  constructor()
  {
    super("JWT Not Found");
  }
}
