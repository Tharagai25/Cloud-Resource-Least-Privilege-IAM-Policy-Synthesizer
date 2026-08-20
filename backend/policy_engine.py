def generate_policy(service, resource, permission):

    policies = {
        "s3": {
            "read": ["s3:GetObject"],
            "write": ["s3:PutObject"],
            "delete": ["s3:DeleteObject"],
            "list": ["s3:ListBucket"]
        },
        "ec2": {
            "read": ["ec2:DescribeInstances"],
            "start": ["ec2:StartInstances"],
            "stop": ["ec2:StopInstances"]
        }
    }

    service = service.lower()
    permission = permission.lower()

    if service not in policies:
        return {
            "error": "Unsupported cloud service"
        }

    if permission not in policies[service]:
        return {
            "error": "Unsupported permission for this service"
        }

    actions = policies[service][permission]

    if service == "s3":
        resource_arn = f"arn:aws:s3:::{resource}/*"
    elif service == "ec2":
        resource_arn = f"arn:aws:ec2:*:*:instance/{resource}"
    else:
        resource_arn = resource

    policy = {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": actions,
                "Resource": resource_arn
            }
        ]
    }

    return policy