import { Eq, Repository } from 'services/Storage';
import { Preference } from './types';

export class PreferencesRepository extends Repository<Preference> {
  public async findOneByKey(key: string): Promise<Preference | undefined> {
    const results = await this.find({
      where: { key: Eq(key) },
    });
    return results[0];
  }
}
