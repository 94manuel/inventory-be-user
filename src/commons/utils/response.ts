const createResponse = (status: any, data: any) => {
    return {
        statusCode: status.code,
        headers: {
            "content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({ data, status: status.code })
    };
};

const createErrorResponse = (status: any, customMessage: any) => {
    return {
        statusCode: status.code,
        headers: {
            "content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({ error: { message: customMessage || status.message }, status: status.code })
    };
};

module.exports = { createResponse, createErrorResponse };