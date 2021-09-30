export enum ArrayPushCode {
    SUCCESS, FAILURE, UNKNOWN
}

export class ArrayPushError extends Error {

    date: Date;
    code: ArrayPushCode;

    constructor (msg = "", cde: ArrayPushCode, ...params: any[]) {
        /* User parameters go to super */
        super (...params);

        /* Assuming user is using V8 */
        if (Error.captureStackTrace) {
            Error.captureStackTrace (this, ArrayPushError);
        }

        /* Properties */
        this.message = msg;
        this.code = cde;
        this.name = 'ArrayPushError';
        this.date = new Date ();
    }
}

export const arrayPush = <DType, > (arrObj: Array<DType>, item: DType): ArrayPushCode => {

    const preLen: number = arrObj.length;
    arrObj.push (item);
    const posLen: number = arrObj.length;

    let rtcCode;
    if (posLen === preLen) {
        rtcCode = ArrayPushCode.FAILURE;
    } else if (preLen === -1 + posLen) {
        rtcCode = ArrayPushCode.SUCCESS;
    } else {
        rtcCode = ArrayPushCode.UNKNOWN;
    }

    return rtcCode;
};


export const arrayPushHandler = <DType, > (arrObj: Array<DType>, item: DType) => {
    switch (arrayPush<DType> (arrObj, item)) {
        case ArrayPushCode.SUCCESS:
            return;
        case ArrayPushCode.FAILURE:
            const msgFailure = `Error: unable to insert item <- ${item} in Array <- ${arrObj}`;
            throw new ArrayPushError (msgFailure, ArrayPushCode.FAILURE);
        case ArrayPushCode.UNKNOWN:
        default:
            const msgUnknown = `Bad trouble: unable to insert item <- ${item} in Array <- ${arrObj}`;
            throw new ArrayPushError (msgUnknown, ArrayPushCode.UNKNOWN);
    }
};

export default arrayPushHandler;
