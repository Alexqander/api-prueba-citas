export function Response200(res, data) {
  return res.status(200).json({ message: `succesful operation `, data });
}

export function Response201(res, resource, operation) {
  return res.status(201).json({
    message: `your resource ${resource} has been successfully ${operation}`,
    data: resource
  });
}

export function Response400(res, errors) {
  return res.status(400).json({ message: 'Bad Request', errors });
}

export function Response401(res) {
  return res.status(401).json({ message: 'Unauthorized' });
}

export function Response403(res) {
  return res
    .status(403)
    .json({ message: 'You do not have permission to access this resource' });
}

export function Response404(res, message = 'Resource not found') {
  return res.status(404).json({ message });
}

export function Response500(res, errors) {
  return res.status(500).json({
    message: 'ah ocurrido un error en el servidor',
    errors
  });
}
