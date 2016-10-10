
import { OpaqueToken } from '@angular/core';

/**
 * Root path for operations. Used for constructing URLs to obtain
 * HTML pages for documentation regarding general API information.
 */
export const GENERAL_ROOT_PATH = 'general';

/**
 * Root path for operations. Used for constructing URLs to obtain
 * HTML pages for documentation regarding API operations.
 */
export const OPERATIONS_ROOT_PATH = 'operations';

/**
 * A token for injection of the raw JSON configuration.
 */
export const RESTDOCSEXT_CONFIG = new OpaqueToken('restdocsext.ui.configuration');
