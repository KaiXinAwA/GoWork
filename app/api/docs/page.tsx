'use client';

import { useEffect } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function ApiDocs() {
  useEffect(() => {
    // 可以在这里加载动态配置
  }, []);

  const spec = {
    openapi: '3.0.0',
    info: {
      title: 'GoWork API',
      version: '1.0.0',
      description: 'API documentation for GoWork platform',
    },
    paths: {
      '/api/auth/login': {
        post: {
          summary: '用户登录',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string' },
                    password: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: '登录成功',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      name: { type: 'string' },
                      email: { type: 'string' },
                      role: { type: 'string' },
                    },
                  },
                },
              },
            },
            '401': {
              description: '认证失败',
            },
          },
        },
      },
      // 添加更多API端点...
    },
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">GoWork API 文档</h1>
      <SwaggerUI spec={spec} />
    </div>
  );
}