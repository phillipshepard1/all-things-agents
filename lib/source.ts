import { docs } from '../.source/server';
import { loader } from 'fumadocs-core/source';

export const source = loader({
  baseUrl: '/client-keeper-crm/support',
  source: docs.toFumadocsSource(),
});
